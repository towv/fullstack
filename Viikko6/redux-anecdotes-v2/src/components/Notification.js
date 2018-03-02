import React from 'react'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    console.log(this)
    return (
      <div>
        {this.props.store.getState().notification === '' ? null :
          <div style={style}>
            {this.props.store.getState().notification}
          </div>
        }
      </div>
    )
  }
}

export default Notification
