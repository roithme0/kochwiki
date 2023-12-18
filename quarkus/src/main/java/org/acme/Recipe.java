package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;

import java.util.ArrayList;
import java.util.List;
import org.jboss.logging.Logger;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Recipe extends PanacheEntity {
    private static final Logger log = Logger.getLogger(Recipe.class);

    @Column(unique = true, nullable = false, length = 200)
    private String name;

    @Column(nullable = false, length = 2)
    private Integer servings;

    @Column(nullable = true, length = 3)
    private Integer preptime;

    @Column(nullable = true, length = 200)
    private String origin_name;

    @Column(nullable = true, length = 200)
    private String origin_url;

    // @Column(nullable = true)
    // private File original;

    // @Column(nullable = true)
    // private File image;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @Column(nullable = true)
    @JsonManagedReference("recipe-amounts")
    private List<Amount> amounts = new ArrayList<>();

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @Column(nullable = true)
    @JsonManagedReference("recipe-steps")
    private List<Step> steps = new ArrayList<>();

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
        return origin_name;
    }

    public String getOriginUrl(){
        return origin_url;
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
        log.debug("Recipe: setting name ...");
        name = newName;
    }

    public void setServings(Integer newServings){
        if(newServings < 0 || newServings > 99){
            throw new IllegalArgumentException("Wert muss zwischen 0 und 99 liegen.");
        }
        servings = newServings;
    }

    public void setPreptime(Integer newPreptime){
        if(newPreptime < 0 || newPreptime > 999){
            throw new IllegalArgumentException("Wert muss zwischen 0 und 999 liegen.");
        }
        preptime = newPreptime;
    }

    public void setOriginName(String newOriginName){
        origin_name = newOriginName;
    }

    public void setOriginUrl(String newOriginUrl){
        origin_url = newOriginUrl;
    }

    // public void setOriginal(File newOriginal){

    // }

    // public void setImage(File newImage){

    // }

    public void setAmounts(List<Amount> newAmounts){
        log.debug("Recipe: adding amounts ...");
        amounts = new ArrayList<>();
        for(Amount amount : newAmounts){
            log.debug(amount.getIndex().toString());
            addAmount(amount);
        }
    }

    public void addAmount(Amount newAmount){
        amounts.add(newAmount);
        newAmount.setRecipe(this);
    }

    public void setSteps(List<Step> newSteps){
        steps = new ArrayList<>();
        for(Step step : newSteps){
            this.addStep(step);
        }
    }

    public void addStep(Step newStep){
        steps.add(newStep);
        newStep.setRecipe(this);
    }

    public Recipe(){
    }

    public Recipe(
        String name, 
        Integer servings, 
        Integer preptime, 
        String origin_name, 
        String origin_url,
        // File original,
        // File image,
        List<Amount> amounts,
        List<Step> steps
        ){
        this.setName(name);
        this.setServings(servings);
        this.setPreptime(preptime);
        this.setOriginName(origin_name);
        this.setOriginUrl(origin_url);
        // this.setOriginal(original);
        // this.setImage(image);
        this.setAmounts(amounts);
        this.setSteps(steps);
    }
}
