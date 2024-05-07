<script lang="ts">
    import '../../styles/inputs.css'
    import '../../styles/form_texts.css'

    import type LoginDTO from "../../../api/models/LoginDTO";
    import { goto } from '$app/navigation';
    import type { User } from '../../../api/models/user';

    let email: string = "";
    let password: string = "";
    let token = ''
    
    const handleLogin = async() => {
        if (email.length > 0 && password.length > 0) {
            const loginData: LoginDTO = {email, password};
            const response = await fetch('http://localhost:8000/users/login',{
                method: 'POST',
                body: JSON.stringify(loginData),
                headers: {
                    "Content-Type": "application/json"
                },
            })
            token = await response.json()

            const userResponse = await fetch('http://localhost:8000/users/authenticate', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    token : token
                },
            })

            let user : User = await userResponse.json()

            sessionStorage.setItem('user_id', user.id)
            sessionStorage.setItem('token', token)
            goto('/lobby')
        }
    }

</script>

<div>
    <form class="loginCard" on:submit={handleLogin}>
        <h2>Inicia sesión</h2>
        <input  type="email" 
                placeholder="Ingrese su email"
                bind:value={email}>
        <input  type="password"
                placeholder="Ingrese su contraseña"
                bind:value={password}/>
        <button type="submit" class="submitButton">Iniciar Sesión</button>
    </form>
    <hr />
    <h2>¿No tienes cuenta?</h2>
    <a class="submitButton longSubmitButton" href="/Register">Registrate</a>
</div>

<style>
    .loginCard {
        display: flex;
        flex-direction: column;
    }
</style>