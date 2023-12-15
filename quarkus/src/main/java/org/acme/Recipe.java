package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@Entity
public class Recipe extends PanacheEntity {
    private static final Logger LOG = Logger.getLogger(Recipe.class.getName()); 

    @Column(unique = true, nullable = false, length = 200)
    private String name;

    @Column(nullable = false, length = 2)
    private Integer servings;

    @Column(nullable = true, length = 3)
    private Integer preptime;

    @Column(nullable = true, length = 200)
    private String originName;

    @Column(nullable = true, length = 200)
    private String originUrl;

    // @Column(nullable = true)
    // private File original;

    // @Column(nullable = true)
    // private File image;

    // @OneToMany(mappedBy = "recipe")
    // @Column(nullable = true)
    // private List<Amount> amounts;

    @OneToMany(mappedBy = "recipe")
    @Column(nullable = true)
    private List<Step> steps;

    public String getName() {
        return name;
    }

    public Integer getServings(){
        return servings;
    }

    public Integer getPreptime(){
        return preptime;
    }

    public String getOriginName(){
        return originName;
    }

    public String getOriginUrl(){
        return originUrl;
    }

    // public File getOriginal(){

    // }

    // public File getImage(){

    // }

    // public Amount[] getAmounts(){
    //     return amounts;
    // }

    public List<Step> getSteps(){
        return steps;
    }

    public void setName(String name){
        this.name = name;
    }

    public void setServings(Integer servings){
        if(servings < 0 || servings > 99){
            throw new IllegalArgumentException("Wert muss zwischen 0 und 99 liegen.");
        }
        this.servings = servings;
    }

    public void setPreptime(Integer preptime){
        if(preptime < 0 || preptime > 999){
            throw new IllegalArgumentException("Wert muss zwischen 0 und 999 liegen.");
        }
        this.preptime = preptime;
    }

    public void setOriginName(String originName){
        this.originName = originName;
    }

    public void setOriginUrl(String originUrl){
        this.originUrl = originUrl;
    }

    // public void setOriginal(File original){

    // }

    // public void setImage(File image){

    // }

    // public void setAmounts(List<Amount> amounts){
    //     this.amounts = amounts;
    // }

    public void setSteps(List<Step> steps){
        this.steps = new ArrayList<>();
        for(Step step : steps){
            this.addStep(step);
        }
    }

    public void addStep(Step step){
        steps.add(step);
        step.setRecipe(this);
    }

    public Recipe(){
    }

    public Recipe(
        String name, 
        Integer servings, 
        Integer preptime, 
        String originName, 
        String originUrl,
        List<Step> steps
        ){
        this.setName(name);
        this.setServings(servings);
        this.setPreptime(preptime);
        this.setOriginName(originName);
        this.setOriginUrl(originUrl);
        // this.setOriginal(original);
        // this.setImage(image);
        // this.setAmounts(amounts);
        this.setSteps(steps);
    }
}
