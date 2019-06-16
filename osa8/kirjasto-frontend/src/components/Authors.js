import React, { useState } from 'react'

const Authors = ({result, show}) => {
    const [authors, setAuthors] = useState(null)
    if (!show) {
        return null
    }
    setAuthors(result.data.allAuthors)
    console.log(result)
    console.log(authors)
    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>
                    born
                    </th>
                    <th>
                    books
                    </th>
                </tr>
                {result.data.allAuthors.map(a =>
                    <tr key={a.name}>
                    <td>{a.name}</td>
                    <td>{a.born}</td>
                    <td>{a.bookCount}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default Authors