import styles from './dialog.module.css'
export default function Dialog({children,...props} ) {
  const openDialog = () => {
    const dialog = document.getElementById('dialog')
    dialog.showModal()
  }
  return (
    <dialog className={styles.dialog} {...props} open>
      <h1>{children}</h1>
    </dialog>
  )

}
