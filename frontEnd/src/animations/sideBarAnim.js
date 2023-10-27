export const sideBarAnimation={
    hidden:{
        clipPath:"ircle(13.0% at 50% 50%)",
        opacity:0
    },
    show:{
        clipPath:"circle(70.7% at 50% 50%)",

        opacity:1,
        transition:{
            duration:0.75,
            ease:"easeOut",
            staggerChildren:0.1,
            when:"beforeChildren"
        }
    },
    exit:{
        clipPath:"circle(13.0% at 50% 50%)",
        opacity:0,  
        transition:{
            duration:0.5
        }
    }


}

export const sideBarItemAnimation={
    hidden:{
        y:30,
        opacity:0
    },
    show:{
        y:0,
        opacity:1,
        transition:{
            ease:"easeOut",
            duration:0.5
        }},
        exit:{
            y:30,
            opacity:0,
            transition:{
                duration:0.5
            }
        }
}