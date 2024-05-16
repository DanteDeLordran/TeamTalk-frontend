<script lang="ts">
    import { goto, invalidateAll } from '$app/navigation';
    import type { MessageRequest } from '../../../../api/models/message.js';
    import { Messages } from '../../../../api/roots/api_services.js';
    import { ErrToken } from '../../../../api/roots/err_types.js';
    import '../../../styles/chat.css';
    import '../../../styles/inputs.css';

    export let data;

    let message = ''
    let bottom : HTMLElement
    let messages = data.messages ?? [];

    console.log(messages)

    const createNewMessage = async() => {
        if (data.userId && data.channelId) {
            const messageRequest : MessageRequest = {
                user_id : data.userId,
                message : message,
                channel_id: data.channelId
            }

            const message_res = await Messages.send(messageRequest, data.token);

            if (message_res === ErrToken.NOT_GIVEN_TOKEN || message_res === ErrToken.NOT_VALID_TOKEN) {
                alert('La sesión expiró, ¡Vuelva a iniciar sesión!')
                sessionStorage.clear();
                goto('/');
                return;
            }
            
            invalidateAll();
            message = '';
            bottom.scrollIntoView({ behavior: 'smooth' });
    
        }
    }

</script>

<div class="fixed top-0 w-full bg-zinc-900 text-cyan-50" >
    <h1 class="text-center py-2">Channel {data.channelId}</h1>
</div>
{#if messages.length === 0}
<div class="text-center">Sin mensajes , sé el primero en escribir !</div>
{:else}
<div class="text-cyan-50 my-9 h-full chatContainer">
    {#each messages as message}
    <div class = 'chatBubble' class:rightBubble={message.user_id === data.userId}>
        <span>{message.user_id}</span>
        <p>{message.message}</p>
        <span>{message.createdAt.toLocaleString()}</span>
    </div>
    {/each}
</div>
<div bind:this={bottom}></div>
{/if}
<div class="fixed bottom-0 w-full p-2 bg-zinc-900 text-cyan-50">
    <form class="flex items-center" on:submit={createNewMessage}>
        <textarea class="text-black w-full messageInput" placeholder="Write a message" maxlength="500" bind:value={message}/>
        <button class="submitButton mx-2" disabled={message.length == 0} >Send</button>
    </form>
</div>
