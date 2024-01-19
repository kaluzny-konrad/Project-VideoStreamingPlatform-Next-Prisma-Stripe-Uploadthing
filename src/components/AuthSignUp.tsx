import Link from 'next/link'
import AuthUserForm from './AuthUserForm'

type Props = {}

export default function AuthSignUp({}: Props) {
  return (
    <div>
        <h1>Sign Up</h1>

        <AuthUserForm />

        <p>
            Already a user? <Link href="/sign-in">Sign in</Link>
        </p>
    </div>
  )
}