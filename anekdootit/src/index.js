import React from 'react'
import ReactDOM from 'react-dom'

const Votes = [0, 0, 0, 0, 0, 0]

const HasVotes = (props) => {
    return (
        <div>has {Votes[props.id]} votes</div>

    )
}

const MostVotes = () => {
    const most = Votes.reduce((highest, x, i, Votes) => x > Votes[highest] ? i : highest, 0)

    return (
        <div>
            <h2>anecdote with most votes</h2>
            {anecdotes[most]}
            <HasVotes id={most} />
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0
        }
    }

    vote = () => {
        return () => {
            Votes[this.state.selected] += 1
            this.setState({ selected: this.state.selected })
        }
    }

    random = (props) => {
        this.setState({ selected: Math.floor(Math.random() * (5 - 0 + 1)) + 0 })
    }

    render() {
        return (
            <div>
                {this.props.anecdotes[this.state.selected]}
                <HasVotes id={this.state.selected} />
                <button onClick={this.vote()}>vote</button>
                <button onClick={this.random}>next anecdote</button>
                <MostVotes />
            </div>
        )
    }
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)