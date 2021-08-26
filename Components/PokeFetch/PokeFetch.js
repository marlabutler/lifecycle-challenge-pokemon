import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      startTime: false,
      time: 10,
      hasAppeared: false
    }
  }

  componentDidMount() {
    console.log('My Pokemon has mounted');
    this.interval = setInterval(() => this.decrement(), 1000);
    console.log(this.interval);
  }

  componentDidUpdate() {
    console.log('My Pokemon has updated');
    if (this.state.time === 0 && this.state.hasAppeared === false) {
      this.setState({
        hasAppeared: true 
      })
    }
  }

  componentWillUnmount() {
    console.log('My Pokemon has unmounted');
    clearInterval(this.interval);
  }

  decrement() {
    if (this.state.startTime === true && this.state.time > 0) {
      this.setState((prevState) =>({
        time: prevState.time - 1
      }))
    }
  }

  fetchPokemon = async() => {
    this.setState({
      startTime: false,
      hasAppeared: false,
      time: 10,
    })

    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .catch((err) => console.log(err))
  }

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 className={'timer'} >{this.state.time}</h1>
        <div className={'pokeWrap'}>
          {this.state.hasAppeared ? (
          <img className={'pokeImg'} src={this.state.pokeSprite} />
          ) : (
            <img
            className={'pokeDark'}
            src={this.state.pokeSprite}
            />
          )}
          {this.state.hasAppeared ? <h1 className={'pokeName'}>{this.state.pokeName}</h1> : null}
        </div>
      </div>
    )
  }
}

export default PokeFetch;