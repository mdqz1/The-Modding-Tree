addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade('p', 14)) mult = mult.times(upgradeEffect('p', 14))
        if (hasUpgrade('p', 23)) mult = mult.times(5)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "1st upgrade",
            description: "Double point gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "2nd upgrade",
            description: "Double point gain, again.",
            cost: new Decimal(3),
            unlocked() {
                if (hasUpgrade('p', 11)) return true
            },
        },
        13: {
            title: "3rd upgrade",
            description: "Boost points based on prestige points.",
            cost: new Decimal(5),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked() {
                if (hasUpgrade('p', 12)) return true
            }
        },
        14: {
            title: "4th upgrade",
            description: "Boost prestige points based on points.",
            cost: new Decimal(10),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked() {
                if (hasUpgrade('p', 13)) return true
            }
        },
        21: {
            title: "5th upgrade",
            description: "Point gain boosts itself.",
            cost: new Decimal(25),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked() {
                if (hasUpgrade('p', 14)) return true
            },
        },
        22: {
            title: "6th upgrade",
            description: "Prestige point gain boosts itself.",
            cost: new Decimal(100),
            effect() {
                return player[this.layer].points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked() {
                if (hasUpgrade('p', 21)) return true
            },
        },
        23: {
            title: "7th upgrade",
            description: "Quintuple prestige point gain.",
            cost: new Decimal(200),
            unlocked() {
                if (hasUpgrade('p', 22)) return true
            },
        },
        24: {
            title: "8th upgrade",
            description: "Unlock a buyable.",
            cost: new Decimal(1500),
            unlocked() {
                if (hasUpgrade('p', 23)) return true
            },
        },
    },
})