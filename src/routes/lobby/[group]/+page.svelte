<script lang="ts">
    import { goto, invalidateAll } from "$app/navigation";
    import type { ChannelRequest } from "../../../api/models/group.js";
  import { Channels } from "../../../api/roots/api_services.js";
  import { ErrChannelCreate } from "../../../api/roots/err_types.js";

    export let data;

    let channelName = "";
    let showModal = false

    const createNewChannel = async () => {

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

<h1>Grupo { data.groupId }</h1>

<h2>Canales</h2>

<button on:click={()=>{showModal = true}}>Crear canal nuevo</button>
<ul>
    {#if data.channels}
    {#each data.channels as channel}
        <a href={`/lobby/${data.groupId}/${channel.id}`}>
            <li>{channel.channel_name}</li>
        </a>
    {/each}
    {:else}
    <p>No estás unido a ningún canal</p>
    {/if}
</ul>

{#if showModal}
    <div>
        <h2>Create New Channel</h2>
        <form on:submit|preventDefault={createNewChannel}>
            <label for="channelName">Channel Name:</label>
            <input id="channelName" bind:value={channelName} required />
            <button type="submit">Create</button>
        </form>
    </div>
{/if}