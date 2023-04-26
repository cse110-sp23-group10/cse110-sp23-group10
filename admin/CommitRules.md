# Rules and Instructions to follow when Making changes using Git

_Note: This is using the command line and not using Github Desktop_

Following is the standard procedure that everyone must follow before proceeding to make any changes / pursuing development:

1. When you open up VS code with the project, it opens under the main branch. Ensure that the project is upto date. This can be done by running the following command in the directory of the project (where you cloned using git):  <code>git pull origin main</code>
2. Create a new branch and check it out using <code>git checkout -b "[Insert Branch Name here]" </code> 
3. Make your required changes
4. Stage your changes using <code>git add .</code>
5. Commit your changes locally using <code>git commit -m "[Enter commit message here]"</code>
6. Push your changes to origin using <code>git push --set-upstream origin [branch name]</code> if this is the first time you created and used this branch else use <code>git push origin [branch name]</code>

# What to do my merge conflict

There are many reasons for a merge conflict to happen. The two main reasons are:

1. You forgot to pull before making any changes causing the remote branch to be different than your local one. 

    In this case what you want to do is revert your changes, pull from origin and make your changes again.

    a) Get the hash code for your latest commit. This can be using the command <code>git log --oneline</code>. This gives you the commit history in reverse chronological order (implying the latest commit is the first one). Copy the commit hash code (long code, easily visible). Then use the following command <code>git revert [Add your hash code here]</code>

    b) in your current branch, run <code>git pull origin main</code> to pull latest from remote. 

    c) Redo your changes
    d) Commit again

2. TBD