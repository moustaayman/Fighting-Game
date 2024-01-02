package com.example.fightinggame;

public class Enemy extends Character {
    private Loot loot;

    public Enemy(String name, int pv, Loot loot) {
        super(name, pv);
        this.loot = loot;
    }

    @Override
    public void attack(Character target) {
        target.takeDamage(5);
    }


    @Override
    public String toString() {
        return "Enemy{name='" + getName() + "', pv=" + getPv() + ", loot=" + loot + '}';
    }
}