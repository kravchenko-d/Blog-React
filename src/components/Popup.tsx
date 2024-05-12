import { FC, PropsWithChildren } from "react"
import '../styles/popup.scss'

type Props = {
  isVisible: boolean // isVisible?: boolean ? - необязательность
  hide: () => void
}

const Popup: FC<PropsWithChildren & Props> = ({ isVisible = false, hide, children, ...rest }) => { // props = {isVisible, children, ...rest}

  return <div className={"popup" + (isVisible ? '' : ' hidden')}>
    <span onClick={hide}>close</span>
    <div className="body">
      {children}
    </div>
  </div>
}

export default Popup