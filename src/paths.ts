export const paths = {
  home() {
    return "/";
  },
  showTopic(slug: string) {
    return `/topics/${slug}`;
  },
  createPost(slug: string) {
    return `/topics/${slug}/posts/new`;
  },
  showPost(slug: string, postId: string) {
    return `/topics/${slug}/posts/${postId}`;
  },
};
