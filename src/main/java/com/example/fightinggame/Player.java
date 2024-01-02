package com.example.fightinggame;

class Player extends Character {
    private int experience;

    public Player(String name, int pv) {
        super(name, pv);
        this.experience = 0;
    }

    public void attack(Character target) {
        target.takeDamage(10);
        increaseExperience(10);
    }
    public void increaseExperience(int amount) {
        this.experience += amount;
    }

    public boolean isAlive() {
        return this.getPv() > 0;
    }

    public void takeDamage(int damage) {
        this.setPv(this.getPv() - damage);
    }

    public int getExperience() {
        return experience;
    }
    public void setExperience(int experience) {
        this.experience=experience;
    }
    @Override
    public String toString() {
        return "Player{name='" + getName() + "', pv=" + getPv() + ", experience=" + experience + '}';
    }
}