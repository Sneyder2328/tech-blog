/**
 * Calculate estimated reading time for a given text.
 * Uses 238 words per minute (Medium's reading speed).
 */
export function calculateReadingTime(content: string): number {
  // Strip MDX/JSX components and HTML tags
  const text = content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/import\s+.*?from\s+['"].*?['"];?/g, '') // Remove import statements
    .replace(/\{[^}]*\}/g, '') // Remove JSX expressions
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Convert links to just text
    .replace(/[#*_~]/g, '') // Remove markdown formatting
    .trim();

  // Count words (split by whitespace)
  const words = text.split(/\s+/).filter((word) => word.length > 0);
  const wordCount = words.length;

  // Medium uses approximately 238 words per minute
  const wordsPerMinute = 238;
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  // Minimum 1 minute
  return Math.max(1, minutes);
}

/**
 * Format reading time with appropriate label
 */
export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}

