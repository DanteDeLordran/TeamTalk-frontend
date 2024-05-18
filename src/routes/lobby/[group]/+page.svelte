<script lang="ts">
    import { goto, invalidateAll } from "$app/navigation";
    import type { ChannelRequest } from "../../../api/models/group.js";
    import { Channels } from "../../../api/roots/api_services.js";
    import { ErrChannelCreate } from "../../../api/roots/err_types.js";
    import OkCancelModal from "../../components/Globals/OKCancelModal.svelte";
    import '../../styles/inputs.css'

    export let data;

    let channelName = "";
    let showModal = false

    const createNewChannel = async () => {

        if (channelName.length === 0) {
            alert('Especifique un nombre para el canal');
            return
        }

        if (data.groupId === undefined) {
            return;
        }

        const channel: ChannelRequest = {
            group_id: data.groupId,
            channel_name: channelName,
        };

        const create_channel_response = await Channels.create(channel, data.token);

        if (create_channel_response === ErrChannelCreate.EXISTING_CHANNEL) {
            alert('Ya existe un canal con ese nombre');
            return;
        }

        if (create_channel_response === ErrChannelCreate.NOT_GIVEN_TOKEN 
            || create_channel_response === ErrChannelCreate.NOT_VALID_TOKEN) {
            
            alert('La sesión caducó, ¡Vuelva a iniciar sesión!');
            sessionStorage.clear();
            goto('/');
            return;
        }

        channelName = '';
        invalidateAll();
        showModal = false;

    };
</script>
<div class="flex justify-center py-2 bg-zinc-900">
    <h1 class="text-center font-bold">Grupo { data.groupId }</h1>
</div>

<h2 class="font-bold mt-2">Canales</h2>

<ul class="channelmenu overflow-y-auto">
    {#if data.channels}
    {#each data.channels as channel}
        <a class="channel_button" href={`/lobby/${data.groupId}/${channel.id}`}>
            <li>{channel.channel_name}</li>
        </a>
    {/each}
    {:else}
    <p>No estás unido a ningún canal</p>
    {/if}
</ul>
<button on:click={()=>{showModal = true}}
    class="submitButton mx-2 my-2">Crear canal nuevo
</button>

{#if showModal}
    <OkCancelModal title="Crear un canal" oklabel="Crear" cancelLabel="Cancelar"
    whenOk={createNewChannel}
    whenCancel={() => {showModal = false}}>
        <form on:submit|preventDefault={createNewChannel}>
            <label for="channelName">Nombre del Canal:</label>
            <input id="channelName" class="text-black" bind:value={channelName} required />
        </form>
    </OkCancelModal>
{/if}