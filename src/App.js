import React, { useEffect, useState } from "react";
import "./App.sass";
import Dexie from "dexie";

const db = new Dexie("recipes_database");

const App = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [calories, setCalories] = useState(0);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    db.version(1).stores({
      recipes: "++id,title,description,calories"
    });

    db.table("recipes")
      .orderBy("calories")
      .toArray()
      .then(recipes => {
        setRecipes(recipes);
      });
  }, []);

  const onSave = event => {
    console.log(title, description, calories);
    db.recipes.add({ title, description, calories }).then(() => {
      db.table("recipes")
        .orderBy("calories")
        .toArray()
        .then(recipes => {
          setRecipes(recipes);
        });
    });
    event.preventDefault();
  };

  console.log(recipes);

  return (
    <div>
      <form className="controls">
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </label>
        <label>
          Calories:
          <textarea
            type="text"
            name="calories"
            value={calories}
            onChange={e => setCalories(e.target.value)}
          />
        </label>
        <button type="submit" onClick={onSave}>
          Save
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Calories</th>
          </tr>
        </thead>
        <tbody>
          {recipes.forEach(recipe => {
            return (
              <tr>
                <td>{recipe.title}</td>
                <td>{recipe.description}</td>
                <td>{recipe.calories}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
