<script>
    import { Section, Register } from 'flowbite-svelte-blocks';
    import { Button, Checkbox, Label, Input, Heading, Modal, P } from 'flowbite-svelte';
    export let form;
    let popupModal = false;
    if(form?.message != undefined){
        popupModal = true;
    }
</script>
<Modal title='Sign up message' bind:open={popupModal} size="xs" autoclose>
    <div class="text-center">
     <!--<ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" /> --> 
      <P whitespace="preline" class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{form?.message}</P>
      <!--Has a success button to redirect to MailBox-->
      <Button color="alternative" on:click={() => (popupModal = false)}>Ok</Button>
    </div>
</Modal>
<Section  name="crudreadsection">
    <Register>
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <form class="flex flex-col space-y-2.5" method="POST">
            <Heading class="text-center"  tag="h2">Sign Up</Heading>
            <Label class="space-y-2">
                <span>Name</span>
                <Input type="text" name="name" placeholder="Carl" required />
            </Label>
            <Label class="space-y-2">
                <span>Surname</span>
                <Input type="text" name="surname" placeholder="Nxumalo" required />
            </Label>
            <Label class="space-y-2">
                <span>Student Number</span>
                <Input type="number" name="student_number" placeholder="00000000" required />
            </Label>
            <Label class="space-y-2">
                <span>Email</span>
                <Input type="email" name="email" placeholder="studentNo@mynwu.ac.za" required />
            </Label>
            <Label class="space-y-2">
                <span>Password</span>
                <Input type="password" name="password" placeholder="••••••••••" required />
            </Label>
            <div class="flex items-start">
                <Checkbox name="type">Are you a lecturer?</Checkbox>
            </div>
            <Button type="submit" class="w-full1">Create an account</Button>
            <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                Already have an account? <a href="/signin" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in here</a>
            </div>
        </form>
        </div>
    </Register>
</Section>