  import { getAllPosts } from "@/lib/posts";
  import HeroSection from "@/components/HeroSection";

  export default function Home() {
    const posts = getAllPosts();
    return <HeroSection posts={posts} />;
  }