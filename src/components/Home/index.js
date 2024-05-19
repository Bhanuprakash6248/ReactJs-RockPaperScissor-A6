import {Component} from 'react'
import {RiCloseLine} from 'react-icons/ri'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import './index.css'
import ScoreView from '../ScoreView'

import GameResultsView from '../GameResultsView'

import {
  MainContainer,
  RulesView,
  PopUpView,
  PopUpImage,
} from './styledComponents'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class Home extends Component {
  state = {
    isShow: true,
    newArray: [choicesList[0], choicesList[1]],
    text: 'YOU WON',
    score: 0,
  }

  getResult = (item1, item2) => {
    if (item1.id === 'ROCK') {
      switch (item2.id) {
        case 'PAPER':
          return 'YOU LOSE'
        case 'SCISSORS':
          return 'YOU WON'
        default:
          return 'IT IS DRAW'
      }
    } else if (item1.id === 'SCISSORS') {
      switch (item2.id) {
        case 'PAPER':
          return 'YOU WON'
        case 'ROCK':
          return 'YOU LOSE'
        default:
          return 'IT IS DRAW'
      }
    } else {
      switch (item2.id) {
        case 'SCISSORS':
          return 'YOU LOSE'
        case 'ROCK':
          return 'YOU WON'
        default:
          return 'IT IS DRAW'
      }
    }
  }

  checkResult = id => {
    const {score} = this.state
    const choice1 = choicesList.filter(each => each.id === id)
    const choice2 = choicesList[Math.floor(Math.random() * choicesList.length)]
    console.log(choice2)
    const result = this.getResult(choice1[0], choice2)

    let newScore = score
    if (result === 'YOU WON') {
      newScore += 1
    } else if (result === 'YOU LOSE') {
      newScore -= 1
    } else {
      newScore = score
    }

    this.setState({
      isShow: false,
      newArray: [choice1[0], choice2],
      text: result,
      score: newScore,
    })
  }

  restartGame = () => {
    this.setState({isShow: true})
  }

  render() {
    const {isShow, newArray, text, score} = this.state
    return (
      <MainContainer>
        <ScoreView score={score} />
        <GameResultsView
          choicesList={choicesList}
          text={text}
          isShow={isShow}
          newArray={newArray}
          checkResult={this.checkResult}
          restartGame={this.restartGame}
        />
        <RulesView>
          <Popup
            modal
            trigger={
              <button type="button" className="trigger-button">
                RULES
              </button>
            }
          >
            {close => (
              <PopUpView>
                <button
                  type="button"
                  className="trigger-button-close"
                  onClick={() => close()}
                >
                  <RiCloseLine />
                </button>
                <PopUpImage
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  alt="rules"
                />
              </PopUpView>
            )}
          </Popup>
        </RulesView>
      </MainContainer>
    )
  }
}

export default Home
