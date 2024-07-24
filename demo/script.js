// script.js
document.addEventListener("DOMContentLoaded", () => {
    const villagers = [];
    let villagerCount = 0;

    const locations = {
        farm: document.getElementById("farm"),
        market: document.getElementById("market"),
        home: document.getElementById("home"),
    };

    const log = document.getElementById("log");
    const addVillagerButton = document.getElementById("addVillager");
    const removeVillagerButton = document.getElementById("removeVillager");

    // FSM transitions
    const transitions = {
        home: "farm",
        farm: "market",
        market: "home",
    };

    // Move villager to a location with some randomness to avoid overlap
    function moveTo(villager, location) {
        const element = document.getElementById(villager.id);
        const rect = locations[location].getBoundingClientRect();
        const offsetX = Math.random() * (rect.width - 20); // Adjust for villager width
        const offsetY = Math.random() * (rect.height - 20); // Adjust for villager height
        element.style.left = rect.left + offsetX + "px";
        element.style.top = rect.top + offsetY + "px";
    }

    // Log messages
    function logMessage(message) {
        const newLog = document.createElement("div");
        newLog.textContent = message;
        log.appendChild(newLog);
        log.scrollTop = log.scrollHeight;
    }

    // Change state and move villager
    function changeState(villager) {
        const currentState = villager.state;
        const nextState = transitions[currentState];
        villager.state = nextState;

        if (nextState === "farm") {
            villager.gold = Math.floor(Math.random() * 4) + 6; // Produce 6-9 gold
            logMessage(`${villager.id} produced ${villager.gold} gold at the farm`);
        } else if (nextState === "market") {
            logMessage(`${villager.id} sold ${villager.gold} gold at the market`);
            villager.gold = 0; // Reset gold after selling
        }

        moveTo(villager, nextState);
    }

    // Add a new villager
    function addVillager() {
        villagerCount++;
        const villagerId = `villager${villagerCount}`;
        const villager = { id: villagerId, state: "home", gold: 0 };
        villagers.push(villager);

        const villagerElement = document.createElement("div");
        villagerElement.className = "villager";
        villagerElement.id = villagerId;
        document.getElementById("villagers").appendChild(villagerElement);

        moveTo(villager, villager.state);
    }

    // Remove the last villager
    function removeVillager() {
        if (villagers.length > 0) {
            const villager = villagers.pop();
            const villagerElement = document.getElementById(villager.id);
            villagerElement.parentNode.removeChild(villagerElement);
            logMessage(`${villager.id} has been removed from the village`);
        }
    }

    // Initialize positions and set interval for each villager
    setInterval(() => {
        villagers.forEach(villager => changeState(villager));
    }, 3000);

    addVillagerButton.addEventListener("click", addVillager);
    removeVillagerButton.addEventListener("click", removeVillager);

    // Add initial villagers
    addVillager();
    addVillager();
    addVillager();
});
