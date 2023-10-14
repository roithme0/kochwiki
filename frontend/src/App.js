import axios from "axios"
import React from "react"

class App extends React.Component {
  state = { details: [] }
  componentDidMount() {
    let data
    axios
      .get("http://localhost:8000/users/")
      .then(res => {
        data = res.data
        this.setState({ details: data })
        console.log(data)
      })
      .catch(err => {})
  }
  render() {
    const details = this.state.details
    return (
      <div>
        <header>Django Data</header>
        <ul>
          {details.map(user => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default App
