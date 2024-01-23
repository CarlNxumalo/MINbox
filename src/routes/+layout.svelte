<script>
    import "../app.pcss";
    import {DarkMode,Badge, Heading,Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
    export let data;
</script>

<div>
    <Navbar style="align-items: center;" >
      <NavBrand href="/">
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            <Heading tag="h4" class="flex items-center" size="text-5xl">
                MINbox <Badge class="text-lg font-semibold ml-2">Alpha</Badge>
            </Heading>
        </span>
      </NavBrand>
      <NavHamburger />
      <NavUl>
        {#if data?.user == 'student'}
          <NavLi href="/student">MailBox</NavLi>
          <NavLi href="/student/mymodules">MyModules</NavLi>
          <NavLi href="/student/joinmodules">JoinModules</NavLi>
        {:else if data?.user == 'lecturer'}
          <NavLi href="/lecturer">Mail</NavLi>
        {:else}
          <NavLi href="/">Home</NavLi>
          <NavLi href="/signin">SignIn</NavLi>
          <NavLi href="/signup">SignUp</NavLi>
        {/if}
       <!-- <NavLi><DarkMode></DarkMode></NavLi> -->
      </NavUl>
    </Navbar>
</div>
<div style="margin-top: 1rem;"></div>

<slot></slot>