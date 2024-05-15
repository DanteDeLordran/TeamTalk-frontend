<script lang="ts">
  import { json } from '@sveltejs/kit';
  import type RegisterLocalInfo from '../../api/models/RegisterLocalInfo';
  import AppHeader from '../components/Globals/AppHeader.svelte';
  import type { PageData } from './$types';
  import RegisterCard from './RegisterCard.svelte';
  import LoadingWidget from '../components/Globals/LoadingWidget.svelte';
  import { goto } from '$app/navigation';
  import { Users } from '../../api/roots/api_services';
  import { ErrRegister } from '../../api/roots/err_types';
    
    export let data: PageData;
    let loading = false;

    async function register(loginData: RegisterLocalInfo) {
        loading = true;

        const response = await Users.register(loginData);

        if (response === ErrRegister.NOT_VALID_EMAIL) {
            loading = false;
            alert('Compruebe que haya escrito un email válido');
            return;
        }

        if (response === ErrRegister.NOT_VALID_PASSWORD) {
            loading = false;
            alert('Compruebe que la contraseña sea válida (Debe contener mayúsculas y minúsculas, al menos un cáracter especial, letras y números y una longitud mínima de 8 cáracteres)');
            return;
        }

        if (response === ErrRegister.USER_EXISTS) {
            loading = false;
            alert('Ya hay un usuario con ese nombre de usuario o correo electrónico');
            return;
        }

        if (response === ErrRegister.SOME_EMPTY_FIELDS) {
            loading = false;
            alert('Compruebe que todos los campos esten completos');
            return;
        }

        loading = false;
        goto('/');

    }

</script>

<AppHeader/>
<main>
    <div>
        {#if loading}
        <LoadingWidget />    
        {:else}
        <RegisterCard onRegisterButtonClick={register} />
        {/if}
    </div>
</main>

<style>
    main {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    div {
        display: flex;
        justify-content: center;
        flex-flow: column;
        align-items: center;
        background-color: rgba(185, 185, 185, 0.253);
        width: fit-content;
        padding: 16px;
        border-radius: 16px;
        transition: all 200ms;
        backdrop-filter: blur(10px);
    }
    div:hover {
        box-shadow: 0 0 20px rgb(167, 40, 252);
        background-color: rgba(137, 107, 184, 0.253);
    }
</style>