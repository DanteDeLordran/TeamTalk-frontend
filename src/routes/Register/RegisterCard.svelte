<script lang="ts">
    import '../styles/inputs.css';
    import '../styles/form_texts.css';
    import type RegisterLocalInfo from '../../api/models/RegisterLocalInfo';
    
    export let onRegisterButtonClick = (registerData: RegisterLocalInfo) => {}; 

    let name = "";
    let lastname = "";
    let username = "";
    let email = "";
    let password = "";
    let confirmPassword = "";

    function handleSubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLButtonElement; }) {
        const registerData: RegisterLocalInfo = {
            name,
            lastname,
            username,
            email,
            password,
            confirmPassword
        };

        onRegisterButtonClick(registerData);
    }
</script>

<form>
    <h2>Registrese llenando los campos</h2>
    <input bind:value={name} type="text" placeholder="Nombre" required/>
    <input bind:value={lastname} type="text" placeholder="Apellido" required/>
    <input bind:value={username} type="text" placeholder="Nombre de usuario" required/>
    <input bind:value={email} type="email" placeholder="Email" required/>
    <input bind:value={password} type="password" placeholder="Contraseña" required/>
    <input bind:value={confirmPassword} type="password" placeholder="Confirmar contraseña" required/>
    <button type="submit" class="submitButton" on:submit|preventDefault={handleSubmit}>Registrarse</button>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
    }
</style>