// Debug script to check user data
// Run this in browser console to check user defaultProject

console.log('=== USER DEBUG INFO ===');

// Check auth store
const authStore = window.__ZUSTAND_STORE__?.auth || {};
console.log('Auth Store:', authStore);

// Check if user has defaultProject
if (authStore.user) {
    console.log('User ID:', authStore.user.id);
    console.log('User Email:', authStore.user.email);
    console.log('Default Project ID:', authStore.user.defaultProjectId);
    console.log('Default Project:', authStore.user.defaultProject);
    console.log('Default Team ID:', authStore.user.defaultTeamId);
    console.log('Workspace ID:', authStore.user.workspaceId);
} else {
    console.log('No user found in auth store');
}

// Check localStorage
console.log('LocalStorage auth:', localStorage.getItem('auth'));

// Check if there are any projects
fetch('/api/graphql', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        query: `
            query {
                projects {
                    data {
                        id
                        name
                        teamId
                        default
                    }
                }
            }
        `
    })
})
.then(res => res.json())
.then(data => {
    console.log('Projects from API:', data);
})
.catch(err => {
    console.error('Error fetching projects:', err);
});

console.log('=== END DEBUG INFO ===');