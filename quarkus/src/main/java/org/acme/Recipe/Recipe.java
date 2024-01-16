package org.acme.Recipe;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;

import java.util.ArrayList;
import java.util.List;
import java.net.URL;

import org.acme.Amount.Amount;
import org.acme.Step.Step;
// import org.jboss.logging.Logger;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Recipe extends PanacheEntity {
    // private static final Logger log = Logger.getLogger(Recipe.class);

    @Column(unique = true, nullable = false, length = 200)
    private String name;

    @Column(nullable = false, length = 2)
    private Integer servings;

    @Column(nullable = true, length = 3)
    private Integer preptime;

    @Column(nullable = true, length = 200)
    private String originName;

    @Column(nullable = true, length = 200)
    private URL originUrl;

    // @Column(nullable = true)
    // private File original;

    // @Column(nullable = true)
    // private File image;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @Column(nullable = true)
    @JsonManagedReference("recipe-amounts")
    private List<Amount> amounts = new ArrayList<>();

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @Column(nullable = true)
    @JsonManagedReference("recipe-steps")
    private List<Step> steps = new ArrayList<>();

    public Long getId(){
        return id;
    }

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

    public URL getOriginUrl(){
        return originUrl;
    }

    // public File getOriginal(){

    // }

    // public File getImage(){

    // }

    public List<Amount> getAmounts(){
        return amounts;
    }

    public List<Step> getSteps(){
        return steps;
    }

    public void setName(String newName){
        name = newName;
    }

    public void setServings(Integer newServings){
        if(newServings < 0 || newServings > 99){
            throw new IllegalArgumentException("Wert muss zwischen 0 und 99 liegen.");
        }
        servings = newServings;
    }

    public void setPreptime(Integer newPreptime){
        if(newPreptime == null){ // allow null values
            return;
        }
        if(newPreptime < 0 || newPreptime > 999){
            throw new IllegalArgumentException("Wert muss zwischen 0 und 999 liegen.");
        }
        preptime = newPreptime;
    }

    public void setOriginName(String newOriginName){
        originName = newOriginName;
    }

    public void setOriginUrl(URL newOriginUrl){
        originUrl = newOriginUrl;
    }

    // public void setOriginal(File newOriginal){

    // }

    // public void setImage(File newImage){

    // }

    public void setAmounts(List<Amount> newAmounts){
        List<Amount> oldAmounts = new ArrayList<>(amounts);
        for(Amount amount : oldAmounts){
            this.removeAmount(amount);
        }
        for(Amount amount : newAmounts){
            addAmount(amount);
        }
    }

    public void addAmount(Amount newAmount){
        amounts.add(newAmount);
        newAmount.setRecipe(this);
    }

    public void removeAmount(Amount amount){
        amounts.remove(amount);
        amount.setRecipe(null);
    }

    public void setSteps(List<Step> newSteps){
        List<Step> oldSteps = new ArrayList<>(steps);
        for(Step step : oldSteps){
            this.removeStep(step);
        }
        for(Step step : newSteps){
            this.addStep(step);
        }
    }

    public void addStep(Step newStep){
        steps.add(newStep);
        newStep.setRecipe(this);
    }

    public void removeStep(Step step){
        steps.remove(step);
        step.setRecipe(null);
    }

    public Recipe(){
    }

    // for import.sql
    public Recipe(
        String name, 
        Integer servings, 
        Integer preptime, 
        String originName, 
        URL originUrl
        // File original,
        // File image,
        ){
        this.setName(name);
        this.setServings(servings);
        this.setPreptime(preptime);
        this.setOriginName(originName);
        this.setOriginUrl(originUrl);
        // this.setOriginal(original);
        // this.setImage(image);
    }

    public Recipe(
        String name, 
        Integer servings, 
        Integer preptime, 
        String originName, 
        URL originUrl,
        // File original,
        // File image,
        List<Amount> amounts,
        List<Step> steps
        ){
        this.setName(name);
        this.setServings(servings);
        this.setPreptime(preptime);
        this.setOriginName(originName);
        this.setOriginUrl(originUrl);
        // this.setOriginal(original);
        // this.setImage(image);
        this.setAmounts(amounts);
        this.setSteps(steps);
    }
}
