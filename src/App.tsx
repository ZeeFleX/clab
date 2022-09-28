import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import styles from './App.module.sass'

import { Header, Flashes } from 'components'
import { Mainpage, SignIn, SignUp, PasswordRecovery } from 'pages'

const App = () => {
  return (
    <BrowserRouter>
      <div className={styles.rootWrapper}>
        <Header />
        <div className={styles.contentContainer}>
          <Flashes />
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/password-recovery" element={<PasswordRecovery />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
