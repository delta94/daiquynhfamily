import React from 'react'
import arrowUp from 'svg/arrow-up.svg'
import cssModuleNameTag from 'utils/cssModuleNameTag'
import styles from './styles.scss'

const cssModules = cssModuleNameTag(styles)

class ScrollButton extends React.Component {
  state = { isVisibled: false }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  check = () => this.setState({ isVisibled: window.pageYOffset > window.innerHeight })

  rollup = () => window.scrollTo(0, 0)

  render() {
    const { isVisibled } = this.state
    return (
      <div
        className={cssModules`root`}
        data-visible={isVisibled}
        onScroll={this.check}
        onClick={this.rollup}
      >
        <img src={arrowUp} alt="arrow-up" />
      </div>
    )
  }
}

export default ScrollButton
