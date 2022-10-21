import { MDXRemoteSerializeResult } from 'next-mdx-remote'

export type InferGetStaticPathsType<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>
}>
  ? R
  : never

export type MarkdownResult = MDXRemoteSerializeResult<Record<string, unknown>>
