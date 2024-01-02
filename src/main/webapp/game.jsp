<%@ page import="com.example.fightinggame.Knight" %>
<%@ page import="com.example.fightinggame.Wizard" %>
<%@ page import="com.example.fightinggame.Enemy" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
  <title>Fighting Game</title>
</head>
<body>
<%
  Knight knight = (Knight) request.getAttribute("knight");
  Wizard wizard = (Wizard) request.getAttribute("wizard");
  Enemy enemy = (Enemy) request.getAttribute("enemy");
%>
<script>
  window.knight = {
    pv: <%= knight.getPv() %>
  };

  window.wizard = {
    pv: <%= wizard.getPv() %>,
    mp: <%= wizard.getMp() %>
  };

  window.enemy = {
    pv: <%= enemy.getPv() %>
  };
</script>

<script src="https://unpkg.com/kaboom@3000.0.0-beta.2/dist/kaboom.js"></script>
<script src="gameLogic.js" type="module"></script>
</body>
</html>
