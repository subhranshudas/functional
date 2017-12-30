const compose = (...fns) => 
    (init) =>
        fns.reduce((composed, fn) => 
            fn(composed)
        , init);

const oneSecond = () => 1000

const clear = () => console.clear()

const getCurrentTime = () => new Date()

const serializeTime = (time) => ({
    hours: time.getHours(),
    minutes: time.getMinutes(),
    seconds: time.getSeconds()
}) 

const civialianTime = (time) => ({
    ...time,
    hours: (time.hours > 12) ? time.hours - 12 : time.hours
})

const prependZero = (time) => ({
    ...time,
    hours: (time.hours < 10) ? `0${time.hours}` : time.hours,
    minutes: (time.minutes < 10) ? `0${time.minutes}` : time.minutes,
    seconds: (time.seconds < 10) ? `0${time.seconds}` : time.seconds
});

const addAMPM = (time) => ({
    ...time,
    ampm: (time.hours >= 12) ? 'PM' : 'AM'
})

const logTime = (time) => {
    const { hours, minutes, seconds, ampm } = time
    console.log(`Time now is ${hours} : ${minutes} : ${seconds} ${ampm}`);
}

const startTicking = () => {
    setInterval(
        compose(
            clear,
            getCurrentTime,
            serializeTime,
            civialianTime,
            prependZero,
            addAMPM,
            logTime
        ),
        oneSecond()
    );
};

startTicking();