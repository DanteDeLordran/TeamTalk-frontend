<script lang="ts">
    import '../../styles/inputs.css'
    import '../../styles/form_texts.css'

    import type LoginDTO from "../../../api/models/LoginDTO";
    import { goto } from '$app/navigation';
    import { Users } from '../../../api/roots/api_services';
    import { ErrLogin, ErrToken } from '../../../api/roots/err_types';

    let email: string = "";
    let password: string = "";
    
    const handleLogin = async() => {
        if (email.length > 0 && password.length > 0) {
            const loginData: LoginDTO = {email, password};

            const token = await Users.login(loginData);

            if (token === undefined) {
                const res = confirm('Las credenciales no son válidas, ¿Desea registrarse?');
                if (res)
                    goto('/Register');

                return;
            }

            if (token === ErrLogin.NOT_VALID_EMAIL) {
                alert('El correo electrónico no es válido');
                return;
            }

            if (token === ErrLogin.NOT_VALID_PASSWORD) {
                alert('La contraseña no es válida');
                return;
            }

            const userResponse = await Users.authenticate(token);

            if (userResponse === ErrToken.NOT_GIVEN_TOKEN) {
                alert('No se ha iniciado sesión');
                goto('/');
                return;
            }

            if (userResponse === ErrToken.NOT_VALID_TOKEN) {
                alert('Su sesión ha expirado');
                goto('/');
                return;
            }

            sessionStorage.setItem('user_id', userResponse.id);
            sessionStorage.setItem('token', token);
            goto('/lobby');

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