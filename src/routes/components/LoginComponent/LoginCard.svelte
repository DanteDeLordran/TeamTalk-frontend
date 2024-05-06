<script lang="ts">
    import '../../styles/inputs.css'
    import '../../styles/form_texts.css'

    import type LoginDTO from "../../../api/models/LoginDTO";

    let email: string = "";
    let password: string = "";
    
    const handleLogin = async() => {
        if (email.length > 0 && password.length > 0) {
            const loginData: LoginDTO = {email, password};
            console.log(loginData)
            const response = await fetch('http://localhost:8000/users/login',{
                method: 'POST',
                body: JSON.stringify(loginData),
                headers: {
                    "Content-Type": "application/json"
                },
            })
            console.log(await response.status)
            console.log(await response.json())
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