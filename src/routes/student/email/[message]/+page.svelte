<script>
    import { Section } from "flowbite-svelte-blocks";
    import { Label, Input, Button, Select, Textarea, P, Heading, Hr, Modal, Alert } from "flowbite-svelte";
    export let data;
    let popupModal = false;
    if(data?.error != undefined){
        popupModal = true;
    }
</script>
<Modal title='Email Status' bind:open={popupModal} size="xs" autoclose>
    <div class="text-center">
    <!--<ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" /> --> 
    <P whitespace="preline" class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{data.error}</P>
    <!--Has a success button to redirect to MailBox-->
    <Button color="alternative" on:click={() => (popupModal = false)}>Ok</Button>
    </div>
</Modal>

<Section name="contact">
{#if !data.message }
    <Alert color="dark">
        <span class="font-medium">Info alert!</span>
        Looks like the message does not exist. 
    </Alert>
{:else}
    <div >
        <Heading tag="h3">Student Mail</Heading>
    </div>
    <div class="grid gap-4 sm:grid-cols-2 sm:gap-2" style="padding-top: 1rem; padding-bottom: 2rem;">
        <Label for="name" >Name: {data.message?.student.name}</Label>
        <Label for="surname" >Surname: {data.message?.student.surname}</Label>
        <Label for="uni_number" >Student number: {data.message?.student.uni_number}</Label>
        <Label for="module_code" >Module code: {data.message?.module_code}</Label>
    </div>
    
    <div class="grid gap-4 sm:grid-cols-2 sm:gap-6" style="padding-bottom: 1rem;">
        <div class="sm:col-span-2">
        <Heading tag="h6" style="padding-bottom: 1rem;">Subject: {data.message?.subject}</Heading>
        <P whitespace="preline">
            {data.message?.message}
        </P>
        </div>
    </div>
    {#if data.message?.reply != null}
        <Hr></Hr>
        <div style="padding-bottom: 4rem;">
            <Heading tag="h3" style="padding-bottom: 1rem; " >Lecturer reply</Heading>
            <P  whitespace="preline" >
                {data.message?.reply}
            </P>
        </div>
    {/if}
    
{/if}

</Section>