function inventoryAllocator(o,i) {
    let order = o;
    let supplies = i;
    let supplierCount = supplies.length;
    let remaining = Number.MAX_VALUE;
    let allocation = [];

    //loop through suppliers
    for(let i = 0; i < supplierCount && remaining !== 0; i ++ ){
        let supplierInventory = Object.keys(supplies[i].inventory);
        let ordered = {};
        // loop through items in supplier's inventory
        supplierInventory.forEach(supplyItem => {
            // inventory item is ordered
            if(order[supplyItem]) {
                // supplier has more inventory than order requires
                if(supplies[i].inventory[supplyItem] >= order[supplyItem]) {
                    ordered[supplyItem] = order[supplyItem];
                    supplies[i].inventory[supplyItem] -= order[supplyItem];
                    order[supplyItem] = 0;
                }
                // supplier has less inventory than order requires
                else if (supplies[i].inventory[supplyItem] < order[supplyItem] && supplies[i].inventory[supplyItem] !== 0) {
                    // check if key value pair is added
                    ordered[supplyItem] ?  
                        ordered[supplyItem] += supplies[i].inventory[supplyItem]: // add amount onto value for key
                        ordered[supplyItem] = supplies[i].inventory[supplyItem]; // create key value pair

                    order[supplyItem] -= supplies[i].inventory[supplyItem];
                    supplies[i].inventory[supplyItem] -= order[supplyItem];
                }
            }
        });

        // if supplier has no inventory that was ordered, don't add object to allocation
        if(Object.entries(ordered).length) allocation.push({[supplies[i].name]: ordered}); 
        remaining = Object.values(order).reduce((prev, curr) => prev + curr );
    }

    // check if order can be fulfilled
    // if so, return allocation object
    // if not, return empty array
    remaining = Object.values(order).reduce((prev, curr) => prev + curr );
    remaining ? console.log([]) : console.log(allocation) ;
}

// Input: { apple: 1 }, [{ name: owd, inventory: { apple: 1 } }]
// Expected Output: [{ owd: { apple: 1 } }]
inventoryAllocator(
    {apple: 5, banana: 5, orange: 5 },
    [{ name: "owd", inventory: { apple: 5, orange: 10 } }, { name: "dm", inventory: { banana: 5, orange: 10 } } ]
);

// Input: { apple: 1 }, [{ name: owd, inventory: { apple: 0 } }]
// Output: []
inventoryAllocator(
    { apple: 1 }, 
    [{ name: "owd", inventory: { apple: 0 } }]
);

// Input: { apple: 10 }, [{ name: owd, inventory: { apple: 5 } }, { name: dm, inventory: { apple: 5 }}]
// Output: [{ dm: { apple: 5 }}, { owd: { apple: 5 } }]
inventoryAllocator(
    { apple: 10 },
    [{ name: "owd", inventory: { apple: 5 } }, { name: "dm", inventory: { apple: 5 }}]
);

// Input: { apple: 10, banana: 5 }, [{ name: owd, inventory: { apple: 5 } }, { name: dm, inventory: { apple: 5, banana: 5 }}]
// Output: [{ dm: { apple: 5 }}, { owd: { apple: 5 } }]
inventoryAllocator(
    { apple: 10, banana: 5 },
    [{ name: "owd", inventory: { apple: 5 } }, { name: "dm", inventory: { apple: 5, banana: 5}}]
);

// Input: { apple: 1 , banana: 1}, [{ name: "owd", inventory: { apple: 5 } }, { name: "dm", inventory: { apple: 10 }}]
// Output: []
inventoryAllocator(
    { apple: 1 , banana: 1}, 
    [{ name: "owd", inventory: { apple: 5 } }, { name: "dm", inventory: { apple: 10 }}]
);

// Input: { apple: 1 },[{ name: "owd", inventory: { apple: 1 } }, { name: "dm", inventory: { apple: 10 }}, { name: "thirdOne", inventory: { apple: 100 } }]
// Output: [{ owd: { apple: 1 } }]
inventoryAllocator(
    { apple: 1}, 
    [{ name: "owd", inventory: { apple: 1 } }, { name: "dm", inventory: { apple: 10 }}, { name: "thirdOne", inventory: { apple: 100 } }]
);
