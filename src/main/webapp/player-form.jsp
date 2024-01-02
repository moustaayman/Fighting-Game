<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Player Form</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }

        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 300px;
            text-align: center;
        }

        h2 {
            color: #333;
        }

        label {
            display: block;
            margin: 10px 0 5px;
            color: #555;
        }

        input, select {
            width: 100%;
            padding: 8px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }

        button {
            background-color: #4caf50;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
<div class="container">
    <h2>Create Players</h2>

    <form action="GameServlet" method="get" id="gameForm" onsubmit="startGame(); return false;">
        <label for="knightName">Knight Name:</label>
        <input type="text" id="knightName" name="knightName" required>

        <label for="knightPV">Knight PV:</label>
        <input type="number" id="knightPV" name="knightPV" required>

        <label for="wizardName">Wizard Name:</label>
        <input type="text" id="wizardName" name="wizardName" required>

        <label for="wizardPV">Wizard PV:</label>
        <input type="number" id="wizardPV" name="wizardPV" required>

        <label for="wizardMP">Wizard MP:</label>
        <input type="number" id="wizardMP" name="wizardMP" required>

        <label for="enemyPV">Enemy PV:</label>
        <input type="number" id="enemyPV" name="enemyPV" required>

        <label for="enemyLoot">Enemy Loot:</label>
        <select id="enemyLoot" name="enemyLoot" required>
            <option value="POTION">POTION</option>
            <option value="MANA_POTION">MANA_POTION</option>
        </select>

        <button type="submit">Start Simulation</button>
    </form>
</div>
</body>
</html>
