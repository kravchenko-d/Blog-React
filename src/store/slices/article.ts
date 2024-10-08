import { createSlice } from '@reduxjs/toolkit';

type Article = {
  id: number;
  text: string;
  title: string;
};

export type Comment = {
  id: number;
  text: string;
  article: number;
  parent?: number; // Comment.id
};

type InitState = {
  articles: Article[];
  comments: Comment[];
  activeArticle?: string | number;
};

const initialState: InitState = {
  articles: [
    {
      title: 'Title test',
      id: 1,
      text: 'Lorem',
    },
  ],
  comments: [],
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    addArticles(state, action) {
      const { title, text } = action.payload;
      state.articles.push({
        title: title,
        id: (state.articles[state.articles.length - 1]?.id ?? 0) + 1,
        text: text,
      });
    },
    deleteArticle(state, action) {
      const index = state.articles.findIndex(({ id }) => id === action.payload);
      if (~index) {
        state.articles.splice(index, 1);
      }
    },
    changeArticle(state, action) {
      const { title, id, text } = action.payload;
      const index = state.articles.findIndex((article) => article.id === id);
      if (~index) {
        state.articles[index].text = text;
        state.articles[index].title = title;
      }
    },
    addComment(state, action) {
      const { text, articleId, parentId } = action.payload;
      state.comments.push({
        id: (state.comments[state.comments.length - 1]?.id ?? 0) + 1,
        text: text,
        article: articleId,
        parent: parentId,
      });
    },
  },
});

export const { addArticles, deleteArticle, changeArticle, addComment } =
  articlesSlice.actions;
export default articlesSlice.reducer;
