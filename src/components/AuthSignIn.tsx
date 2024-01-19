import Link from 'next/link'
import AuthUserForm from './AuthUserForm'

type Props = {}

export default function AuthSignIn({}: Props) {
  return (
    <div>
        <h1>Welcome back</h1>

        <AuthUserForm />

        <p>
            New? <Link href="/sign-up">Sign up</Link>
        </p>
    </div>
  )
}