library(readr)
library(dplyr)
library(tm)
library(SnowballC)
library(textstem)
library(tokenizers)
library(cluster)
library(wordcloud)
library(ggplot2)
library(dendextend)
library(tidytext)
library(RColorBrewer)

set.seed(123)

ai_data <- read_csv("/Users/winterfell/Education/Academic/11th Semester/Data Science Project/ds_ai.csv")
non_ai_data <- read_csv("/Users/winterfell/Education/Academic/11th Semester/Data Science Project/ds_non_ai.csv")

section_stopwords <- c(
  "background","purpose","purposes","unlabelled","objective","objectives",
  "introduction","methods","materials","results",
  "conclusion","conclusions","discussion",
  "aim","aims","study","studies"
)

process_text <- function(text) {
  corpus <- VCorpus(VectorSource(text))
  corpus <- tm_map(corpus, content_transformer(tolower))
  corpus <- tm_map(corpus, removeNumbers)
  corpus <- tm_map(corpus, removePunctuation)
  corpus <- tm_map(corpus, removeWords, stopwords("english"))
  corpus <- tm_map(corpus, removeWords, section_stopwords)
  corpus <- tm_map(corpus, stripWhitespace)
  corpus <- tm_map(corpus, content_transformer(lemmatize_strings))
  corpus <- tm_map(corpus, stemDocument)
  corpus
}

foreground_ai_corpus <- process_text(ai_data$Abstract)
background_non_ai_corpus <- process_text(non_ai_data$Abstract)

tokenizer_fn <- function(x) {
  unlist(tokenize_words(as.character(x), lowercase = FALSE))
}

dtm_ai <- DocumentTermMatrix(
  foreground_ai_corpus,
  control = list(
    tokenize = tokenizer_fn,
    weighting = function(x) weightTfIdf(x, normalize = TRUE)
  )
)

dtm_non_ai <- DocumentTermMatrix(
  background_non_ai_corpus,
  control = list(
    tokenize = tokenizer_fn,
    weighting = function(x) weightTfIdf(x, normalize = TRUE)
  )
)

dtm_ai <- removeSparseTerms(dtm_ai, 0.995)
dtm_non_ai <- removeSparseTerms(dtm_non_ai, 0.995)

tfidf_ai <- as.matrix(dtm_ai)
tfidf_non_ai <- as.matrix(dtm_non_ai)

tfidf_ai <- tfidf_ai[rowSums(tfidf_ai) != 0, , drop = FALSE]
tfidf_non_ai <- tfidf_non_ai[rowSums(tfidf_non_ai) != 0, , drop = FALSE]

mean_ai <- colMeans(tfidf_ai)
mean_non_ai <- colMeans(tfidf_non_ai)

common_terms <- intersect(names(mean_ai), names(mean_non_ai))
contrast_scores <- mean_ai[common_terms] - mean_non_ai[common_terms]

contrast_df <- data.frame(
  term = common_terms,
  contrast = contrast_scores
)

top_ai_terms <- contrast_df %>% arrange(desc(contrast)) %>% head(10)
top_non_ai_terms <- contrast_df %>% arrange(contrast) %>% head(10)

wordcloud(
  words = top_ai_terms$term,
  freq = top_ai_terms$contrast,
  min.freq = 0.001,
  max.words = 10,
  random.order = FALSE,
  colors = brewer.pal(8, "Blues"),
  scale = c(3, 1)
)

wordcloud(
  words = top_non_ai_terms$term,
  freq = abs(top_non_ai_terms$contrast),
  min.freq = 0.001,
  max.words = 10,
  random.order = FALSE,
  colors = brewer.pal(8, "Reds"),
  scale = c(3, 1)
)

all_terms <- union(colnames(tfidf_ai), colnames(tfidf_non_ai))

tfidf_ai_aligned <- matrix(0, nrow = nrow(tfidf_ai), ncol = length(all_terms),
                           dimnames = list(NULL, all_terms))
tfidf_non_ai_aligned <- matrix(0, nrow = nrow(tfidf_non_ai), ncol = length(all_terms),
                               dimnames = list(NULL, all_terms))

tfidf_ai_aligned[, colnames(tfidf_ai)] <- tfidf_ai
tfidf_non_ai_aligned[, colnames(tfidf_non_ai)] <- tfidf_non_ai

all_tfidf_raw <- rbind(tfidf_ai_aligned, tfidf_non_ai_aligned)
all_tfidf_scaled <- scale(all_tfidf_raw)

all_data <- rbind(
  data.frame(Abstract = ai_data$Abstract, Type = "AI"),
  data.frame(Abstract = non_ai_data$Abstract, Type = "Non-AI")
)

k <- 2
kmeans_result <- kmeans(all_tfidf_scaled, centers = k, nstart = 25)
all_data$KMeans_Cluster <- factor(kmeans_result$cluster)

dist_matrix <- dist(all_tfidf_scaled, method = "euclidean")
hc <- hclust(dist_matrix, method = "ward.D2")
all_data$Hier_Cluster <- factor(cutree(hc, k = k))

top_words_per_cluster <- function(tfidf_matrix, clusters, top_n = 10) {
  out <- list()
  for (i in sort(unique(clusters))) {
    mat <- tfidf_matrix[clusters == i, , drop = FALSE]
    scores <- colMeans(mat)
    top <- sort(scores, decreasing = TRUE)[1:top_n]
    out[[paste0("Cluster_", i)]] <- top
  }
  out
}

top_kmeans_words <- top_words_per_cluster(all_tfidf_raw, kmeans_result$cluster)
top_hier_words <- top_words_per_cluster(all_tfidf_raw, cutree(hc, k))

build_df <- function(top_words) {
  bind_rows(lapply(names(top_words), function(cl) {
    data.frame(
      Cluster = cl,
      Term = names(top_words[[cl]]),
      TFIDF = as.numeric(top_words[[cl]]),
      stringsAsFactors = FALSE
    )
  }))
}

top_kmeans_df <- build_df(top_kmeans_words)
top_hier_df <- build_df(top_hier_words)

ggplot(top_kmeans_df,
       aes(x = reorder_within(Term, TFIDF, Cluster),
           y = TFIDF,
           fill = Cluster)) +
  geom_col(show.legend = FALSE) +
  coord_flip() +
  scale_x_reordered() +
  facet_wrap(~Cluster, scales = "free_y") +
  ggtitle("Top Words per K-means Cluster") +
  theme_minimal()

ggplot(top_hier_df,
       aes(x = reorder_within(Term, TFIDF, Cluster),
           y = TFIDF,
           fill = Cluster)) +
  geom_col(show.legend = FALSE) +
  coord_flip() +
  scale_x_reordered() +
  facet_wrap(~Cluster, scales = "free_y") +
  ggtitle("Top Words per Hierarchical Cluster") +
  theme_minimal()

pca_res <- prcomp(all_tfidf_scaled, center = TRUE, scale. = TRUE)

pca_df <- data.frame(
  PC1 = pca_res$x[,1],
  PC2 = pca_res$x[,2],
  Type = all_data$Type,
  KMeans_Cluster = all_data$KMeans_Cluster,
  Hier_Cluster = all_data$Hier_Cluster
)

ggplot(pca_df, aes(PC1, PC2, color = KMeans_Cluster, shape = Type)) +
  geom_point(size = 3, alpha = 0.8) +
  scale_color_brewer(palette = "Dark2") +
  ggtitle("PCA - K-means Clusters") +
  theme_minimal()

ggplot(pca_df, aes(PC1, PC2, color = Hier_Cluster, shape = Type)) +
  geom_point(size = 3, alpha = 0.8) +
  scale_color_brewer(palette = "Set1") +
  ggtitle("PCA - Hierarchical Clusters") +
  theme_minimal()

dend <- as.dendrogram(hc)
dend <- color_branches(dend, k = k)
plot(dend, main = "Hierarchical Clustering Dendrogram")


sil_kmeans <- silhouette(as.numeric(all_data$KMeans_Cluster), dist_matrix)
sil_hier <- silhouette(as.numeric(all_data$Hier_Cluster), dist_matrix)

mean_sil_kmeans <- mean(sil_kmeans[, 3])
mean_sil_hier <- mean(sil_hier[, 3])

mean_sil_kmeans
mean_sil_hier


