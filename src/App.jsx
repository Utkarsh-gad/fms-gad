import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
``

function App() {
  return (
    <>
    <div>Hello</div>
    <Button variant='primary'>Click me</Button>

    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
    </>
  )
}

export default App
