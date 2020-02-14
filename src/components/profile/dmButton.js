import React from 'react'

class dmButton extends React.Component {
  changeView = () => {
    this.props.changeView('currentView')
  }
  render() {
    return (
      <button className="button" onClick={this.changeView} />
    )
  }
}

export default dmButton