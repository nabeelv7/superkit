<main
    class="flex flex-col justify-center items-center py-20 max-w-md mx-auto text-center gap-7 px-5"
>
    <!-- avatar -->
    <div class="avatar">
        <div class="w-24 rounded-full">
            <img
                src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                alt="pfp"
            />
        </div>
    </div>
    <!-- bio -->
    <p class="opacity-80">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </p>
    <!-- links -->
    <ul class="w-full flex flex-col gap-4">
        {#each Array(5) as link}
            <li>
                <a class="btn btn-primary btn-block" href="/">Link</a>
            </li>
        {/each}
    </ul>
</main>
