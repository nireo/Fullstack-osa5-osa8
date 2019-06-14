const { ApolloServer, gql } = require('apollo-server')
const uuid = require('uuid/v1')


let authors = [
	{
		name: 'Robert Martin',
		id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
		born: 1952,
	},
	{
		name: 'Martin Fowler',
		id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
		born: 1963
	},
	{
		name: 'Fyodor Dostoevsky',
		id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
		born: 1821
	},
	{ 
		name: 'Joshua Kerievsky', // birthyear not known
		id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
	},
	{ 
		name: 'Sandi Metz', // birthyear not known
		id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
	},
]

let books = [
	{
		title: 'Clean Code',
		published: 2008,
		author: 'Robert Martin',
		id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
		genres: ['refactoring']
	},
	{
		title: 'Agile software development',
		published: 2002,
		author: 'Robert Martin',
		id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
		genres: ['agile', 'patterns', 'design']
	},
	{
		title: 'Refactoring, edition 2',
		published: 2018,
		author: 'Martin Fowler',
		id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
		genres: ['refactoring']
	},
	{
		title: 'Refactoring to patterns',
		published: 2008,
		author: 'Joshua Kerievsky',
		id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
		genres: ['refactoring', 'patterns']
	},  
	{
		title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
		published: 2012,
		author: 'Sandi Metz',
		id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
		genres: ['refactoring', 'design']
	},
	{
		title: 'Crime and punishment',
		published: 1866,
		author: 'Fyodor Dostoevsky',
		id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
		genres: ['classic', 'crime']
	},
	{
		title: 'The Demon ',
		published: 1872,
		author: 'Fyodor Dostoevsky',
		id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
		genres: ['classic', 'revolution']
	},
]

const typeDefs = gql`
	type Book {
		title: String!
		published: Int!
		author: String!
		id: ID!
		genres: [String!]!
	}

	type Author {
		name: String!
		id: ID!
		born: String
		bookCount: Int!
	}

	type Query {
		authorCount: Int!
		bookCount: Int!
		allBooks(
			genre: String
			name: String
		): [Book!]!
		allAuthors: [Author!]!
	}

	type Mutation {
		addBook(
			title: String!
			published: Int!
			author: String!
			genres: [String!]!
		): Book
		editAuthor(
			name: String!
			setBornTo: Int!
		): Author
	}
`

const resolvers = {
  Query: {
    authorCount: () => authors.length,
    bookCount: () => books.length,
    allBooks: (root, args) => {
		if (args.name && args.genre) {
			const nameFiltered = books.filter(
				b => b.author === args.name
			)
			const genreFiltered = nameFiltered.filter(
				b => b.genres.includes(args.genre)
			)
			return genreFiltered
		}
		if (args.name) {
			return books.filter(
				b => b.author === args.name
			)
		}
		if (args.genre) {
			return books.filter(
				b => b.genres.includes(args.genre)
			) 
		}
		return books
    },
    allAuthors: () => authors
  },
  Author: {
    bookCount: (root) => {
      let count = 0
      books.forEach(book => {
		if (book.id === root.id) {
			count += 1
		}
      })
      return count
    }
  },
  Mutation: {
		addBook: (root, args) => {
			if (books.find(b => b.title === args.title)) {
				throw new UserInputError('title must be unique', {
					invalidArgs: args.title
				})
			}
			const book = { ...args, id: uuid() }
			books = books.concat(book)
			return book
		},
		editAuthor: (root, args) => {
			if (args.setBornTo === undefined) {
				return null
			}
			const author = authors.find(a => a.name === args.name)
			if (!author) {
				return null
			}
			const updatedAuthor = { ...args, born: args.setBornTo }
			authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
			return updatedAuthor
		}
 	 }
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`)
})
