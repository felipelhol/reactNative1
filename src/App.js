/*

Listar os repositórios da sua API: 
Deve ser capaz de criar uma lista de todos os repositórios 
que estão cadastrados na sua API com os campos title, techs e número de curtidas 
seguindo o padrão ${repository.likes} curtidas, apenas alterando o número para ser dinâmico.

Curtir um repositório listado da API: 
Deve ser capaz de curtir um item na sua API através de um botão com o texto Curtir 
e deve atualizar o número de likes na listagem no mobile.

*/


import React, {useEffect, useState } from "react";

import api from './services/api';

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect (() => {
    api.get('repositories').then( response => {
      setRepositories(response.data);
    });
  }, []);
/*
  async function handleAddRepository(){
    const response = await api.post('repositories', {
      title: `Novo projeto ${Date.now()}`,
      url: 'https://github.com/felipelhol',
      tech: 'React Native',
      likes: 0
    });

    const repository = response.data;
    setRepositories([ ... repositories, repository]);
  };

*/
  async function handleLikeRepository(id) {
    // Implement "Like Repository" functionality
    const response = await api.post(`repositories/${id}/like`);

    const likedRepository = response.data;

    const repositoriesUpdated = repositories.map(repository => {
      return repository.id === id ? likedRepository : repository;
      /*
      if (repository.id === id) {
          return likedRepository;
        } else{
          return repository;
        }
        */
    });
   // const likes = repository.likes++;
    setRepositories(repositoriesUpdated);
   // setRepositories(repositories.[`repositoriesLikes/${likes++}`]);

  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          keyExtractor={repository => repository.id}
          renderItem={({ item: repository }) => (
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{repository.title}</Text>

              <View style={styles.techsContainer}>
                {repository.techs.map(tech => (
                  <Text key={tech} style={styles.tech}>
                    {tech}
                  </Text>
                ))}
              </View>

              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  testID={`repository-likes-${repository.id}`}
                >
                  {repository.likes} curtida{repository.likes > 1 ? 's' : ''}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(repository.id)}
                testID={`like-button-${repository.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});


/*
 renderItem={({item: repository}) => (
          <Text style={styles.repository}>{repository.title}</Text>
          )}
          renderItem2={({item: repository}) => (
            <Text style={styles.tech}> {repository.tech} </Text>
          )}
          renderItem3={({item: repository}) => (
            <Text 
            style={styles.likeText}
            testID={`repository-likes-${repository.id}`}
            > {repository.likes} </Text>
          )}
*/