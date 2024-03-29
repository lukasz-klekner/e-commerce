// codegen.ts
import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema:
    'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cla6rcsg90cll01ujh0ocbp0f/master',
  documents: 'graphql/*.graphql',
  generates: {
    'generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
}

export default config
