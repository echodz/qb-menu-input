# qb-menu edited
Menu System for the QBCore Framework

credits : nmsh projects

![image](https://github.com/user-attachments/assets/3bb26ae6-6997-4187-8cd4-9088bc4de251)


--[[
EXAMPLE MENU
--]]

```
RegisterCommand("qbmenutest", function(source, args, raw)
    openMenu({
        {
            header = "Main Title",
            isMenuHeader = true, -- Set to true to make a nonclickable title
        },
        {
            header = "Sub Menu Button",
            txt = "This goes to a sub menu",
            params = {
                event = "qb-menu:client:testMenu2",
                args = {
                    number = 1,
                }
            }
        },
        {
            header = "Sub Menu Button",
            txt = "This goes to a sub menu",
            disabled = true,
            -- hidden = true, -- doesnt create this at all if set to true
            params = {
                event = "qb-menu:client:testMenu2",
                args = {
                    number = 1,
                }
            }
        },
    })
end)
```
```
RegisterNetEvent('qb-menu:client:testMenu2', function(data)
    local number = data.number
    openMenu({
        {
            header = "< Go Back",
        },
        {
            header = "Number: "..number,
            txt = "Other",
            params = {
                event = "qb-menu:client:testButton",
                args = {
                    message = "This was called by clicking this button"
                }
            }
        },
    })
end)
```
```
RegisterNetEvent('qb-menu:client:testButton', function(data)
    TriggerEvent('QBCore:Notify', data.message)
end)
```
