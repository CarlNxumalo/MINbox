<script>
    import { Card, Listgroup, Button, Modal, P, Alert } from 'flowbite-svelte';
    import { Section } from 'flowbite-svelte-blocks';
    export let data;
    export let form;
    let popupModal = false;
    if(form?.message != undefined){
        popupModal = true;
    }
</script>

<Modal title='Remove module proccess' bind:open={popupModal} size="xs" autoclose>
    <div class="text-center">
     <!--<ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" /> --> 
      <P whitespace="preline" class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{form?.message}</P>
      <Button color="alternative" on:click={() => (popupModal = false)}>Ok</Button>
    </div>
</Modal>

<Section name="contact">
    <Card padding="xl" size="xl" class="space-y-2">
        <div class="flex justify-between items-center mb-4">
            <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">My Modules</h5>
        </div>
        {#if data?.modules.length >0}
            <Listgroup items={data?.modules} let:item class="border-0 dark:!bg">
                <div class="flex items-center space-x-4 rtl:space-x-reverse">
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {item?.name}
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                        Advance databases and mangement systems
                        </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <form method="POST" action="?/leave" >
                            <Button type='submit' color="light" name="id" value={item?.value}>leave</Button>
                        </form>
                    </div>
                </div>
            </Listgroup>
        {:else}
            <Alert color="dark">
                <span class="font-medium">Info alert!</span>
                You currently do not have modules, consider <a href="/student/joinmodules" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"> joining a module</a>.
            </Alert>
        {/if}
    </Card>
</Section>