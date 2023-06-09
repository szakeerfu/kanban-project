import {AiOutlineStar} from 'react-icons/ai'
import styles from './Navbar.module.css'
import {BsPersonWorkspace} from 'react-icons/bs'
import {FaClipboardList} from 'react-icons/fa'
import {IoIosArrowDropdown} from 'react-icons/io'
import {SiPowerautomate} from 'react-icons/si'
import {ImPower} from 'react-icons/im'
import {VscListFilter} from 'react-icons/vsc'
function Navbar(){
    return(
        <div className={styles.parentNav}>
           <div className={styles.leftComponent}>
            <div className={styles.homeTask}>
                Home Task Management
           </div>
           <div className={styles.star}>
             <AiOutlineStar/>
           </div>
           <div className={styles.workspace}>
             <BsPersonWorkspace/>  Workspace
           </div>
           <div className={styles.board}>
                <FaClipboardList/> Board
           </div>
           <div className={styles.downArrow}>
            <IoIosArrowDropdown/>
           </div>
           </div>
           <div className={styles.rightComponent}>
            <div className={styles.rightChild}>
             <SiPowerautomate/> Power Ups  
            </div>
            <div className={styles.rightChild}>
              <ImPower/> Automation
            </div>
            <div className={styles.rightChild}>
              <VscListFilter/> Filter
            </div>
            <div className={styles.profile}>
             PR
            </div>

           </div>

        </div>
    )
}
export default Navbar